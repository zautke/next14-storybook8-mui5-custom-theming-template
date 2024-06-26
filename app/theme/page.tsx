import React from "react";
import ThemeRegistry from "@components/ThemeRegistry";
import { Button } from "@mui/material";
import TypographyExample from "@components/MuiComponentSamples/Samples/Typography";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

function Home() {
	return (
		<ThemeRegistry>
			<TypographyExample variant="h2">Hello, world!</TypographyExample>
			<Button variant="contained">Your</Button>
			<Button variant="outlined">Mom</Button>
			<Button variant="text">Rocks</Button>
		</ThemeRegistry>
	);
}

export default Home;
