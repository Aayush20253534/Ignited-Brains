import { expect, test } from "@playwright/test";

const routes = ["/", "/about", "/solutions", "/solutions/space-lab", "/projects", "/media", "/schools", "/contact", "/shop", "/privacy", "/terms", "/admin"];
for (const width of [320, 375, 768, 1024, 1440]) {
  test(`Public pages fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const errors: string[] = [];
      const listener = (error: Error) => errors.push(error.message);
      page.on("pageerror", listener);
      const response = await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
      expect(response?.status(), route).toBe(200);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow at ${route}`).toBe(true);
      await expect(page.locator("[data-nextjs-dialog]")).toHaveCount(0);
      expect(errors, route).toEqual([]);
      const unnamed = await page.locator("main a, main button").evaluateAll((nodes) => nodes.filter((node) => !node.textContent?.trim() && !node.getAttribute("aria-label") && !node.querySelector("img[alt]:not([alt=''])")).length);
      expect(unnamed, `unnamed controls at ${route}`).toBe(0);
      if ([375, 1440].includes(width) && ["/", "/contact", "/projects", "/solutions", "/admin"].includes(route)) {
        await page.screenshot({ path: `/tmp/ib-${width}-${route.replaceAll("/", "") || "home"}.png` });
      }
      page.off("pageerror", listener);
    }
  });
}

test("Hero styles do not enlarge legal buttons or project statistics", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const route of ["/privacy", "/terms"]) {
    await page.goto(route);
    const button = page.getByRole("link", { name: "Contact the team" });
    await expect(button).toBeVisible();
    expect((await button.boundingBox())!.height).toBeLessThan(70);
    expect(await button.evaluate((node) => getComputedStyle(node).color)).toBe("rgb(255, 255, 255)");
  }
  await page.goto("/projects");
  const stats = page.locator("main > section:first-child > .container-wide").nth(1);
  await expect(stats).toBeVisible();
  expect((await stats.boundingBox())!.height).toBeLessThan(180);
});

test("Partner dialog contains focus, validates solutions, and supports Escape", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Partner With Us", exact: true }).first();
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
  await page.getByRole("button", { name: "Apply for an organisation" }).click();
  for (const [name, value] of Object.entries({ name: "Test Principal", email: "principal@example.com", phone: "9999999999", organizationName: "Example School", designation: "Principal", institutionAddress: "Example City", requirementDetails: "Please discuss a robotics learning space." })) {
    await dialog.locator(`[name="${name}"]`).fill(value);
  }
  await dialog.locator('[name="organizationType"]').selectOption("SCHOOL");
  await dialog.getByRole("button", { name: "Submit Application" }).click();
  await expect(dialog.getByRole("alert")).toHaveText("Choose at least one solution.");
  await expect(dialog.getByLabel("AI & Robotics Lab", { exact: true })).toBeVisible();
  await page.keyboard.press("Tab");
  expect(await dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("Mobile navigation retains scroll lock while its partner dialog closes", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation", exact: true }).click();
  await page.locator("#mobile-navigation").getByRole("button", { name: "Partner With Us", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Close navigation", exact: true })).toHaveAttribute("aria-expanded", "true");
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open navigation", exact: true })).toHaveAttribute("aria-expanded", "false");
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("Project details and galleries match the selected card", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("button", { name: "Explore Model Rocket Program", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("Model Rocket Program");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Enlarge: Exploring the skies", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("Exploring the skies");
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("Building solutions");
});

test("Solution chooser and video filter show the selected content", async ({ page }) => {
  await page.goto("/solutions");
  const group = page.getByRole("group", { name: "Choose a solution", exact: true });
  await group.getByRole("button", { name: "STEM Lab", exact: true }).click();
  await expect(page.getByRole("heading", { name: "STEM Lab", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Discuss STEM Lab", exact: true }).last().click();
  await expect(page.locator('input[name="subject"]')).toHaveValue("STEM Lab");
  await page.goto("/media");
  await page.getByRole("button", { name: "Videos", exact: true }).click();
  await expect(page.getByRole("button", { name: "Play film: A vision for innovation spaces", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Play film: A vision for innovation spaces", exact: true }).click();
  await expect(page.getByRole("dialog").locator("video")).toHaveAttribute("controls", "");
  await expect(page.locator("video[autoplay]")).toHaveCount(0);
});

test("Consultation and newsletter requests send the intended payload", async ({ page }) => {
  const payloads: Record<string, unknown>[] = [];
  await page.route("**/api/v1/contact", async (route) => {
    payloads.push(route.request().postDataJSON());
    await route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({ message: "Your enquiry has been submitted successfully." }) });
  });
  await page.goto("/schools#consultation");
  const consultation = page.locator("#consultation form");
  await consultation.locator('[name="name"]').fill("Example Educator");
  await consultation.locator('[name="email"]').fill("teacher@example.com");
  await consultation.locator('[name="organization"]').fill("Example School");
  await consultation.locator('[name="message"]').fill("Please discuss a STEM lab.");
  await consultation.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(consultation.getByRole("status")).toBeVisible();
  expect(payloads[0]).toMatchObject({ subject: "School consultation", email: "teacher@example.com" });
  const newsletter = page.locator("footer form");
  await newsletter.locator('[name="email"]').fill("subscriber@example.com");
  await newsletter.getByRole("button", { name: "Request updates", exact: true }).click();
  await expect(page.locator("footer").getByRole("status")).toContainText("Subscription request received");
  expect(payloads[1]).toMatchObject({ subject: "Newsletter subscription request", email: "subscriber@example.com" });
  expect(payloads[1].message).toContain("I consent");
});

test("Failed submissions stay visible and can be retried", async ({ page }) => {
  await page.route("**/api/v1/contact", (route) => route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ error: "Please try again shortly." }) }));
  await page.goto("/contact");
  const form = page.locator("main form");
  await form.locator('[name="name"]').fill("Example Educator");
  await form.locator('[name="email"]').fill("teacher@example.com");
  await form.locator('[name="message"]').fill("Please discuss a STEM lab.");
  await form.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(form.getByRole("alert")).toContainText("Please try again shortly.");
  await expect(form.locator('[name="name"]')).toHaveValue("Example Educator");
  await expect(form.getByRole("button", { name: "Submit", exact: true })).toBeEnabled();
});

test("Admin mobile cards and detail drawer work with API fixtures", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 850 });
  await page.addInitScript(() => sessionStorage.setItem("ignited-brains-admin-token", "ui-test-token"));
  const contact = { id: "00000000-0000-4000-8000-000000000001", name: "Example Educator", email: "teacher@example.com", phone: "9999999999", organization: "Example School", subject: "STEM Lab", message: "Please send details", status: "NEW", notification_status: "SENT", created_at: "2026-09-01T10:00:00Z", updated_at: "2026-09-01T10:00:00Z" };
  const application = { ...contact, applicant_type: "ORGANIZATION", city: "Example City", state: "Example State", details: { institutionName: "Example School", requestedSolutions: ["AI_ROBOTICS"] } };
  await page.route("**/api/v1/admin/**", (route) => {
    const path = new URL(route.request().url()).pathname;
    let body: unknown;
    if (path.endsWith("/auth/me")) body = { admin: { id: "test-admin", name: "Test Admin", email: "admin@example.com" } };
    else if (path.endsWith("/summary")) body = { contacts: { total: 1, new: 1 }, applications: { total: 1, new: 1, students: 0, organizations: 1 } };
    else body = { data: path.endsWith("/applications") ? [application] : [contact], pagination: { page: 1, limit: 20, total: 1, totalPages: 1 } };
    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(body) });
  });
  await page.goto("/admin");
  await expect(page.getByRole("heading", { name: "Dashboard Overview", exact: true })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toHaveCount(0);
  await page.getByRole("button", { name: "Open admin navigation" }).click();
  await page.getByRole("button", { name: "Contact Enquiries", exact: true }).click();
  await expect(page.getByRole("button", { name: /View enquiry/ })).toBeVisible();
  await page.getByRole("button", { name: /View enquiry/ }).click();
  await expect(page.getByRole("dialog")).toContainText("Please send details");
  await expect(page.getByRole("dialog").getByLabel("Update submission status")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Open admin navigation" }).click();
  await page.getByRole("button", { name: "Applications", exact: true }).click();
  await page.getByRole("button", { name: /View application/ }).click();
  await expect(page.getByRole("dialog")).toContainText("Institution Name");
});
