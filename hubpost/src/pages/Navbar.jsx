import { Link } from "react-router-dom"

const Navbar = () => {

    return (
        <>
            <header style={{
                position: "relative",
                top: 0,
                left: 0,
                width: "100vw",
                height: "auto",
                display: "flex",
                zIndex: 1000,
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <h1 style={{padding: "0 100px", color: "rgb(88,185,158)"}}>TrainingFeed</h1>
                <nav style={{display: "flex", gap: "20px", padding: "0 50px"}}>
                    <Link to="/" style={{ color: "inherit"}}>
                        <h2>HOME</h2>
                    </Link>
                    <Link to="/createPost" style={{ color: "inherit"}}>
                        <h2>CREATE POST</h2>
                    </Link>
                </nav>
            </header>
        </>
    )
}

export default Navbar