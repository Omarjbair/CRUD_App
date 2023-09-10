import { useSelector } from "react-redux/es/hooks/useSelector";

const withGuard = (Component) =>{
    const Wrapper = (props) =>{
        const {isLoggedIn} = useSelector((state) => state.AuthSlice);
        return isLoggedIn?<Component {...props} age = "asd"/>:<div>log in first ...</div>
    }
    return Wrapper;
}

export default withGuard;