import TypographyExample from "@components/MuiComponentSamples/Samples/Typography";
import { Button } from "@mui/material";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

function Home() {
	return (
		<>
			<TypographyExample variant="h2">Hello, world!</TypographyExample>
			<Button variant="contained">Your</Button>
			<Button variant="outlined">Mom</Button>
			<Button variant="text">Rocks</Button>
		</>
	);
}

export default Home;
