"use client";
import React from "react";
import { useEffect, useState } from "react";

export type Recipe = string;
//= {
// 	[key: string]: string;
// };

export type GitCommit = string;

export type Diff = {
	key: string;
	valueA: GitCommit;
	valueB: GitCommit;
};

const fetchRecipe = async (commitId: string): Promise<Recipe> => {
	const response = await fetch(`/api/recipe?commit=${commitId}`);
	return response.json();
};

const fetchDiffs = async (
	commitA: GitCommit,
	commitB: GitCommit,
): Promise<Diff[]> => {
	const response = await fetch(
		`/api/diff?commitA=${commitA}&commitB=${commitB}`,
	);
	return response.json();
};

const DiffViewer = ({ diff }: { diff: Diff }) => {
	return (
		<div style={{ display: "flex", marginBottom: "10px" }}>
			<div
				style={{
					flex: 1,
					padding: "10px",
					backgroundColor: "#ffe6e6",
					border: "1px solid red",
				}}
			>
				<span style={{ color: "red" }}>{diff.valueA}</span>
			</div>
			<div
				style={{
					flex: 1,
					padding: "10px",
					backgroundColor: "#e6ffe6",
					border: "1px solid green",
				}}
			>
				<span style={{ color: "green" }}>{diff.valueB}</span>
			</div>
		</div>
	);
};

const HomePage = () => {
	const [recipeA, setRecipeA] = useState<Recipe | null>(null);
	const [recipeB, setRecipeB] = useState<Recipe | null>(null);
	const [diffs, setDiffs] = useState<Diff[]>([]);

	useEffect(() => {
		const commitA = "commitA_id";
		const commitB = "commitB_id";

		const fetchData = async () => {
			const [recipeAData, recipeBData, diffData] = await Promise.all([
				fetchRecipe(commitA),
				fetchRecipe(commitB),
				fetchDiffs(commitA, commitB),
			]);
			setRecipeA(recipeAData);
			setRecipeB(recipeBData);
			setDiffs(diffData);
		};

		fetchData();
	}, []);

	return (
		<div>
			<h1>Recipe Diff Viewer</h1>
			{recipeA && recipeB && (
				<div>
					<h2>Recipe A</h2>
					<pre>{JSON.stringify(recipeA, null, 2)}</pre>
					<h2>Recipe B</h2>
					<pre>{JSON.stringify(recipeB, null, 2)}</pre>
					<h2>Diffs</h2>
					{diffs.map((diff) => (
						<DiffViewer key={`${diff.valueA}..${diff.valueB}`} diff={diff} />
					))}
				</div>
			)}
		</div>
	);
};

export default HomePage;
