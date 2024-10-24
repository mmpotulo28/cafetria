// src/context/FullScreenContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface FullScreenContextProps {
	isFullScreen: boolean;
	toggleFullScreen: () => void;
}

const FullScreenContext = createContext<FullScreenContextProps | undefined>(undefined);

export const FullScreenProvider = ({ children }: { children: ReactNode }) => {
	const [isFullScreen, setIsFullScreen] = useState(false);

	const toggleFullScreen = () => {
		setIsFullScreen((prev) => !prev);
	};

	return (
		<FullScreenContext.Provider value={{ isFullScreen, toggleFullScreen }}>
			{children}
		</FullScreenContext.Provider>
	);
};

export const useFullScreen = () => {
	const context = useContext(FullScreenContext);
	if (!context) {
		throw new Error("useFullScreen must be used within a FullScreenProvider");
	}
	return context;
};
