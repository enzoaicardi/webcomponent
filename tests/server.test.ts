import { test, expect } from "bun:test";
import { WebComponent } from "../src/@enzoaicardi/server";

class TestSyncComponent extends WebComponent {
    static tagName: string = "test-sync-component";
    render() {
        return `<p>TestSyncComponent</p>`;
    }
}

class TestAsyncComponent extends WebComponent {
    static tagName: string = "test-async-component";
    async renderAsync() {
        await Promise.resolve();
        return `<p>TestSyncComponent</p>`;
    }
}

test("server: render", () => {
    expect(TestSyncComponent.tagName).toBe("test-sync-component");
    expect(new TestSyncComponent().toString()).toBe(
        "<test-sync-component><p>TestSyncComponent</p></test-sync-component>"
    );
});

test("server: renderAsync", async () => {
    const component = new TestAsyncComponent();
    const html = await component.toString();
    expect(html).toBe(
        `<test-async-component><p>TestSyncComponent</p></test-async-component>`
    );
});

test("server: style", () => {
    const component = new TestSyncComponent();
    component.style.backgroundColor = "red";
    expect(component.style + "").toBe("background-color:red;");
    component.style.backgroundColor = "blue";
    expect(component.style + "").toBe("background-color:blue;");
    expect(component.style.cssText).toBe("background-color:blue;");
    expect(component.style.length).toBe(1);
    component.style.removeProperty("background-color");
    expect(component.style + "").toBe("");
    expect(component.style.length).toBe(0);
    component.style.backgroundColor = "green";
    expect(component.toString()).toBe(
        `<test-sync-component style="background-color:green;"><p>TestSyncComponent</p></test-sync-component>`
    );
});

test("server: classList", () => {
    const component = new TestSyncComponent();
    component.classList.add("flex", "m-auto");
    expect(component.classList + "").toBe("flex m-auto");
    component.classList.add("flex", "m-auto");
    expect(component.classList + "").toBe("flex m-auto");
    component.classList.remove("flex", "m-auto");
    expect(component.classList + "").toBe("");
    component.classList.toggle("flex");
    expect(component.classList + "").toBe("flex");
    component.classList.toggle("flex", true);
    expect(component.classList + "").toBe("flex");
    component.classList.toggle("flex");
    expect(component.classList + "").toBe("");
    expect(component.classList.contains("flex")).toBe(false);
    component.classList.toggle("flex");
    expect(component.classList.contains("flex")).toBe(true);
    expect(component.classList.length).toBe(1);
    component.classList.replace("flex", "m-auto");
    expect(component.classList + "").toBe("m-auto");
    expect(component.toString()).toBe(
        `<test-sync-component class="m-auto"><p>TestSyncComponent</p></test-sync-component>`
    );
});

test("server: classList & attributes", () => {
    const component = new TestSyncComponent();
    component.setAttribute("class", "my-class");
    component.classList.add("my-class");
    component.classList.add("other-class");
    component.classList.remove("my-class");
    expect(component.toString()).toBe(
        `<test-sync-component class="other-class"><p>TestSyncComponent</p></test-sync-component>`
    );
});

test("server: style & attributes", () => {
    const component = new TestSyncComponent();
    component.setAttribute("style", "background-color:red;text-align:center;");
    component.style.backgroundColor = "blue";
    delete component.style.textAlign;
    expect(component.toString()).toBe(
        `<test-sync-component style="background-color:blue;"><p>TestSyncComponent</p></test-sync-component>`
    );
});

test("server: attributes", () => {
    const component = new TestSyncComponent();
    component.setAttribute("data-name", "my-component");
    expect(component.getAttribute("data-name")).toBe("my-component");
    expect(component.hasAttribute("data-name")).toBe(true);
    component.removeAttribute("data-name");
    expect(component.hasAttribute("data-name")).toBe(false);
});
