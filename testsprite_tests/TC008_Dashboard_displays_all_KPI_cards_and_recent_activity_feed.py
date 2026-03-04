import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(10000)

        # Open a new page in the browser context
        page = await context.new_page()

        # -> Navigate to http://localhost:3000 (will redirect to /login)
        await page.goto("http://localhost:3000", wait_until="networkidle", timeout=15000)

        # -> Fill the Email field
        email_input = page.locator('input[type="email"], input[name="email"]').first
        await email_input.wait_for(state="visible", timeout=10000)
        await email_input.fill('raf@raf.com')

        # -> Fill the Password field
        password_input = page.locator('input[type="password"], input[name="password"]').first
        await password_input.fill('admin123')

        # -> Click Sign In and wait for navigation to dashboard
        sign_in_button = page.locator('button:has-text("Sign In"), button[type="submit"]').first
        await sign_in_button.click()

        # Wait for navigation away from login page to dashboard
        await page.wait_for_url("http://localhost:3000/", timeout=15000)

        # --> Assertions to verify dashboard loaded with KPI cards and activity feed
        await expect(page.locator('text=Total Stock').first).to_be_visible(timeout=10000)
        await expect(page.locator('text=Low Stock Items').first).to_be_visible(timeout=10000)
        await expect(page.locator('text=Recent Activity').first).to_be_visible(timeout=10000)
        await asyncio.sleep(2)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
