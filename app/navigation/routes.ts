import { IRoute } from "./navigation.types";
// import {Auth, Home, Settings, Profile} from "@/components/screens";

import Auth from "@/components/screens/auth/Auth";
import Home from "@/components/screens/home/Home";
import Settings from "../components/screens/settings/Settings";
import Profile from "@/components/screens/profile/Profile";

export const routes: IRoute[] = [
    {
        name: 'Auth',
        component: Auth
    },
    {
        name: 'Home',
        component: Home
    },
    {
        name: 'Settings',
        component: Settings
    },
    {
        name: 'Profile',
        component: Profile
    },

]