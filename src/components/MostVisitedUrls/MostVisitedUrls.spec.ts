import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/vue";
import MostVisitedUrls from "./MostVisitedUrls.vue";

describe("UniqueIp", () => {
  it("should filter the result and display most visited URLs", async () => {
    // ARRANGE
    const ParentComponent = {
      components: { MostVisitedUrls },
      setup: () => {
        const mockData = [
          { ip_address: "177.71.128.21", url: "/intranet-analytics/" },
          { ip_address: "168.41.191.40", url: "http://example.net/faq/" },
          { ip_address: "168.41.191.41", url: "/this/page/does/not/exist/" },
          {
            ip_address: "168.41.191.40",
            url: "http://example.net/blog/category/meta/",
          },
          {
            ip_address: "177.71.128.21",
            url: "/blog/2018/08/survey-your-opinion-matters/",
          },
          { ip_address: "168.41.191.9", url: "/docs/manage-users/" },
          { ip_address: "168.41.191.40", url: "/blog/category/community/" },
          { ip_address: "168.41.191.34", url: "/faq/" },
          { ip_address: "177.71.128.21", url: "/docs/manage-websites/" },
          { ip_address: "50.112.00.28", url: "/faq/how-to-install/" },
          { ip_address: "50.112.00.11", url: "/asset.js" },
          { ip_address: "72.44.32.11", url: "/to-an-error" },
          { ip_address: "72.44.32.10", url: "/" },
          { ip_address: "168.41.191.9", url: "/docs/" },
          { ip_address: "168.41.191.43", url: "/moved-permanently" },
          { ip_address: "168.41.191.43", url: "/temp-redirect" },
          { ip_address: "168.41.191.40", url: "/docs/manage-websites/" },
          { ip_address: "168.41.191.34", url: "/faq/how-to/" },
          { ip_address: "72.44.32.10", url: "/translations/" },
          { ip_address: "79.125.00.21", url: "/newsletter/" },
          { ip_address: "50.112.00.11", url: "/hosting/" },
          { ip_address: "72.44.32.10", url: "/download/counter/" },
          { ip_address: "50.112.00.11", url: "/asset.css" },
        ];

        return { mockData };
      },
      template: `
         <MostVisitedUrls :data="mockData"></MostVisitedUrls>
      `,
    };

    // ACT
    render(ParentComponent);

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByRole("heading", {
          level: 3,
          name: "The top 3 most visited URLs (exact match)",
        })
      ).toBeVisible()
    );
    const defaultList = screen.getByRole("listbox");
    expect(
      within(defaultList).getByText("/docs/manage-websites/")
    ).toBeInTheDocument();
  });
});
