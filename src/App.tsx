import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./asset/style/App.scss";
import LayoutWrapper from "./component/LayoutWrapper";
import { configureStore } from "./store/store";

function App() {
	return (
		<>
			<Provider store={configureStore.store}>
				<PersistGate
					loading={null}
					persistor={configureStore.persistor}
				>
					<BrowserRouter>
						<LayoutWrapper />
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</>
	);
}

export default App;
