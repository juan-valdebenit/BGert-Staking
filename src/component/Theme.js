import Header from "./Header";
import { Route } from "react-router-dom";

export const Theme = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        element={(props) => {
            // authorised so return component
            return (
                <div>
                    <Header />
                 
                    <Component {...props} />

                </div>
            );
        }}
    />
);
export default Theme;