import { test, expect } from "bun:test";
import { WebComponent } from "../src/@enzoaicardi/server";

class TestSyncComponent extends WebComponent {
    static tagName: string = "test-sync-component";
    render() {
        return `<p>TestSyncComponent</p>`;
    }
}

test("server: render", () => {
    expect(TestSyncComponent.tagName).toBe("test-sync-component");
    expect(new TestSyncComponent().toString()).toBe(
        "<test-sync-component><p>TestSyncComponent</p></test-sync-component>"
    );
});
