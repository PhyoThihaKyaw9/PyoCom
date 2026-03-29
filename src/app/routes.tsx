import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { PaddyInstructions } from "./components/PaddyInstructions";
import { PestClassifier } from "./components/PestClassifier";
import { CommunityFeed } from "./components/CommunityFeed";
import { NotificationSettings } from "./components/NotificationSettings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "paddy", Component: PaddyInstructions },
      { path: "scanner", Component: PestClassifier },
      { path: "community", Component: CommunityFeed },
      { path: "settings", Component: NotificationSettings },
    ],
  },
]);
