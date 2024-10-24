import useRounterElement from './routes/useRoute';

function App() {
    const routerElement = useRounterElement();
    return <div className="h-full w-full">{routerElement}</div>;
}

export default App;
