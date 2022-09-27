import type { Component } from 'solid-js';
import Grid from './components/grid';

const App: Component = () => {
    return (
        <>
            <Grid cols={3} gap='md'>
                <img src="https://picsum.photos/400/300" alt="" />
                <img src="https://picsum.photos/400/300" alt="" />
                <img src="https://picsum.photos/400/300" alt="" />
                <img src="https://picsum.photos/400/300" alt="" />
                <img src="https://picsum.photos/400/300" alt="" />
                <img src="https://picsum.photos/400/300" alt="" />
                <img src="https://picsum.photos/400/300" alt="" />
                <img src="https://picsum.photos/400/300" alt="" />
            </Grid>
        </>
    );
};

export default App;
