// src/context/FullScreenContext.tsx
import { iProduct } from "@/lib/Type";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface FullScreenContextProps {
	isFullScreen: boolean;
	toggleFullScreen: () => void;
	cart: iProduct[];
	addToCart: (item: iProduct) => void;
	removeFromCart: (id: number) => void;
	clearCart: () => void;
}

const FullScreenContext = createContext<FullScreenContextProps | undefined>(undefined);

export const FullScreenProvider = ({ children }: { children: ReactNode }) => {
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [cart, setCartItems] = useState<iProduct[]>(() => {
		if (typeof window !== "undefined") {
			const storedCart = localStorage.getItem("cart");
			return storedCart ? JSON.parse(storedCart) : [];
		}
		return [];
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	}, [cart]);

	const toggleFullScreen = () => {
		setIsFullScreen((prev) => !prev);
	};

	const addToCart = (item: iProduct) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
			if (existingItem) {
				return prevItems.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity + item.quantity }
						: cartItem,
				);
			}
			return [...prevItems, item];
		});
	};

	const removeFromCart = (id: number) => {
		setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
	};

	const clearCart = () => {
		setCartItems([]);
	};

	return (
		<FullScreenContext.Provider
			value={{
				isFullScreen,
				toggleFullScreen,
				cart,
				addToCart,
				removeFromCart,
				clearCart,
			}}>
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
