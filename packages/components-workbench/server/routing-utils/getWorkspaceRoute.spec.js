import getWorkspaceRoute from "./getWorkspaceRoute";

describe("getWorkspaceRoute", () => {
  it("should generate valid route with windows relative path", () => {
    expect(
      getWorkspaceRoute("components\\BonkersButtons\\Main.workspace.js")
    ).toEqual("/components/bonkersbuttons/");
  });
  it("should normalize relative path", () => {
    expect(
      getWorkspaceRoute(
        ".\\components\\BonkersButtons\\somedir\\..\\Main.workspace.js"
      )
    ).toEqual("/components/bonkersbuttons/");
  });
  it("should generate valid route with linux relative path", () => {
    expect(
      getWorkspaceRoute("components/BonkersButtons/Main.workspace.js")
    ).toEqual("/components/bonkersbuttons/");
  });
});
