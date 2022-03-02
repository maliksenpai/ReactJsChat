import {
    Box,
    Button,
    CircularProgress,
    Container,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Switch,
    TextField, Typography
} from "@mui/material";
import {useValidatableForm} from "react-validatable-form";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {UserContext} from "../App";
import {loginUser, registerUser} from "../firebase/firebaseAuth";

export function LoginPage() {

    const [showPassword, setShowPassword] = useState(false)
    const {user} = useContext(UserContext)
    const [register, setRegister] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigator = useNavigate()
    const rules = [
        {
            path: "email",
            ruleSet: [
                {rule: "required"},
                {rule: "email"},
            ],
            dependantPaths: ["comparisonValue"],
        },
        {
            path: "password",
            ruleSet: [
                {rule: "required"},
                {
                    rule: "length",
                    greaterThan: 8,
                },
            ],
            dependantPaths: ["comparisonValue"],
        },
    ]
    const {
        isValid,
        formData,
        setPathValue,
        setFormIsSubmitted,
        setPathIsBlurred,
        getValue,
        getError,
    } = useValidatableForm({
        rules,
        hideBeforeSubmit: true,
        showAfterBlur: true,
        focusToErrorAfterSubmit: true,
    })

    const handleSubmit = (event) => {
        if (isValid) {
            const email = formData.email
            const password = formData.password
            setLoading(true)
            setError(null)
            if(register){
                registerUser({email: email, password:password})
                    .then(() => setLoading(false))
                    .catch(error => {
                        setError(error)
                        setLoading(false)
                    })
            }else{
                loginUser({email: email, password: password})
                    .then(() => setLoading(false))
                    .catch(error => {
                        setError(error)
                        setLoading(false)
                    })
            }
        }
        event.preventDefault()
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    };

    useEffect(() => {
        if(user){
            navigator("/")
        }
    }, [user])

    return <Container sx={{minWidth: "100%", height: "100vh"}}>
        <form onSubmit={handleSubmit}>
            <Box height={"100vh"} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                <Box width={"40vw"} p={1}>
                    <TextField
                        fullWidth
                        placeholder={"Email"}
                        error={!!getError("email")}
                        helperText={getError("email")}
                        type={"text"}
                        value={getValue("email") || ""}
                        onChange={(e) => setPathValue("email", e.target.value)}
                        onBlur={() => setPathIsBlurred("email")}
                        id="email"
                    />
                </Box>
                <Box width={"40vw"} p={1}>
                    <TextField
                        fullWidth
                        placeholder={"Password"}
                        error={!!getError("password")}
                        type={showPassword ? "text" : "password"}
                        helperText={getError("password")}
                        value={getValue("password") || ""}
                        onChange={(e) => setPathValue("password", e.target.value)}
                        onBlur={() => setPathIsBlurred("password")}
                        id="password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position={"end"}>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box width={"40vw"} p={1}>
                    <Button type={"submit"} onSubmit={handleSubmit} variant={"contained"} color={"secondary"} fullWidth>
                        {
                            register ? "Register" : "Login"
                        }
                    </Button>
                </Box>
                <Box width={"40vw"} p={1}>
                    <FormControlLabel control={<Switch value={register} onChange={() => setRegister(!register)} />} label="Register" />
                </Box>
                {
                    loading ? <CircularProgress /> : null
                }
                {
                    error ? <Typography variant={"body2"} component={"p"} color={"red"}> { error.message } </Typography> : null
                }
            </Box>
        </form>
    </Container>
}