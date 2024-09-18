import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/vue";
import ActiveIp from "./ActiveIp.vue";

describe("ActiveIp", () => {
  it("should sort the result and display 3 most active IP addresses", async () => {
    // ARRANGE
    const ParentComponent = {
      components: { ActiveIp },
      setup: () => {
        const mockData = [
          ["50.112.00.11", 3],
          ["50.112.00.28", 1],
          ["72.44.32.10", 3],
          ["72.44.32.11", 1],
          ["79.125.00.21", 1],
          ["168.41.191.9", 2],
          ["168.41.191.34", 2],
          ["168.41.191.40", 4],
          ["168.41.191.41", 1],
          ["168.41.191.43", 2],
        ];

        return { mockData };
      },
      template: `
         <ActiveIp :data="mockData"></ActiveIp>
      `,
    };

    // ACT
    render(ParentComponent);

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByRole("heading", {
          level: 3,
          name: "The top 3 most active IP addresses",
        })
      ).toBeVisible()
    );
    const defaultList = screen.getByRole("listbox");
    expect(within(defaultList).getByText("168.41.191.40")).toBeInTheDocument();
    expect(within(defaultList).getByText("72.44.32.10")).toBeVisible();
    expect(within(defaultList).getByText("50.112.00.11")).toBeVisible();
  });
});
