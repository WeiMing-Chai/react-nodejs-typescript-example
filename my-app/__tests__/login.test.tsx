import { render, screen } from "@testing-library/react";
import LoginPage from "../src/components/Login";
import React from "react";


function mockUseKeycloak() {
  const token = "A random string that is non zero length";
  const userProfile = {
    username: "test",
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
  };
  const realmAccess = { roles: ["user"] };

  const authClient = {
    authenticated: false,
    hasRealmRole(ignored: string) {
      return true;
    },
    hasResourceRole(ignored: string) {
      return true;
    },
    idToken: token,
    profile: userProfile,
    realm: "TestRealm",
    realmAccess,
    refreshToken: token,
    token,
  };
  return { initialized: true, keycloak: authClient };
}

jest.mock("@react-keycloak/web", () => ({ useKeycloak: mockUseKeycloak }));

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({
    state: null,
  }),
}));

test("renders the login page", () => {
  render(<LoginPage />);

  expect(screen.getByText('Login')).toBeInTheDocument();
  expect(screen.getByText('Login')).toBeEnabled();
});