import { User } from "./user";

it("init", () => {
  const u = new User();
  u.init({
    username: "lujs",
  });
  expect(u.username).toBe("lujs");
});
