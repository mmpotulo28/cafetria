import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import AdminLayout from "@/components/AdminLayout";
import styles from "../admin.module.css";
import userStyles from "./users.module.css";
import { iUserProfile, iUserUpdateData } from "@/lib/Type";
import Image from "next/image";
import Chart from "chart.js/auto";

const UsersPage: React.FC = () => {
	const { data: session } = useSession();
	const [users, setUsers] = useState<iUserProfile[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [statusMessage, setStatusMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const usersPerPage = 9;

	const cityChartRef = useRef<HTMLCanvasElement>(null);
	const userTypeChartRef = useRef<HTMLCanvasElement>(null);
	const cityChartInstanceRef = useRef<Chart | null>(null);
	const userTypeChartInstanceRef = useRef<Chart | null>(null);

	const fetchUsers = useCallback(async () => {
		if (!session?.user?.name) return;

		try {
			const response = await fetch(`/api/user/users`);
			const data = await response.json();
			setUsers(data);
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	}, [session?.user?.name]);

	useEffect(() => {
		if (!session?.user?.email) return;
		fetchUsers();
	}, [fetchUsers, session?.user?.email]);

	const clearStatusMessage = () => {
		setTimeout(() => {
			setStatusMessage(null);
		}, 5000);
	};

	const deleteUser = async (email: string) => {
		setLoading(true);
		try {
			const response = await fetch(`/api/user/users?email=${email}`, {
				method: "DELETE",
			});
			if (response.ok) {
				setStatusMessage("User deleted successfully.");
				setUsers(users.filter((user) => user.email !== email));
			} else {
				setStatusMessage("Failed to delete user.");
			}
			clearStatusMessage();
		} catch (error) {
			console.error("Error deleting user:", error);
			setStatusMessage("Error deleting user.");
			clearStatusMessage();
		} finally {
			setLoading(false);
		}
	};

	const updateUserType = async (email: string, userType: string) => {
		setLoading(true);
		try {
			const userResponse = await fetch(`/api/user/profile?email=${email}`);
			if (!userResponse.ok) {
				setStatusMessage("Failed to fetch user profile.");
				clearStatusMessage();
				return;
			}
			const user: iUserUpdateData = await userResponse.json();

			const response = await fetch(`/api/user/users?email=${email}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...user,
					user_type: userType,
				}),
			});
			if (response.ok) {
				setStatusMessage("User type updated successfully.");
				setUsers(
					users.map((user) =>
						user.email === email ? { ...user, user_type: userType } : user,
					),
				);
			} else {
				const errorData = await response.json();
				setStatusMessage(`Failed to update user type: ${JSON.stringify(errorData)}`);
			}
			clearStatusMessage();
		} catch (error) {
			console.error("Error updating user type:", error);
			setStatusMessage("Error updating user type.");
			clearStatusMessage();
		} finally {
			setLoading(false);
		}
	};

	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;
	const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	useEffect(() => {
		const cityData = users.reduce((acc, user) => {
			acc[user.city] = (acc[user.city] || 0) + 1;
			return acc;
		}, {} as { [key: string]: number });

		const userTypeData = users.reduce((acc, user) => {
			acc[user.user_type || 0] = (acc[user.user_type || 0] || 0) + 1;
			return acc;
		}, {} as { [key: string]: number });

		if (cityChartRef.current) {
			if (cityChartInstanceRef.current) {
				cityChartInstanceRef.current.destroy();
			}

			cityChartInstanceRef.current = new Chart(cityChartRef.current, {
				type: "bar",
				data: {
					labels: Object.keys(cityData),
					datasets: [
						{
							label: "Users by City",
							data: Object.values(cityData),
							backgroundColor: "#36a2eb",
							borderColor: "rgb(44, 44, 44)",
							borderWidth: 2,
							borderRadius: 10,
						},
					],
				},
				options: {
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				},
			});
		}

		if (userTypeChartRef.current) {
			if (userTypeChartInstanceRef.current) {
				userTypeChartInstanceRef.current.destroy();
			}

			userTypeChartInstanceRef.current = new Chart(userTypeChartRef.current, {
				type: "bar",
				data: {
					labels: Object.keys(userTypeData),
					datasets: [
						{
							label: "Users by Type",
							data: Object.values(userTypeData),
							backgroundColor: "#ff8f01",
							borderColor: "rgb(44, 44, 44)",
							borderWidth: 2,
							borderRadius: 10,
						},
					],
				},
				options: {
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				},
			});
		}

		return () => {
			if (cityChartInstanceRef.current) {
				cityChartInstanceRef.current.destroy();
			}
			if (userTypeChartInstanceRef.current) {
				userTypeChartInstanceRef.current.destroy();
			}
		};
	}, [users]);

	return (
		<AdminLayout>
			<div className={styles.dashboardCards}>
				<div className={userStyles.users}>
					<h3>Users</h3>
					{statusMessage && <p>{statusMessage}</p>}
					<table className={userStyles.usersTable}>
						<thead>
							<tr>
								<th>Avatar</th>
								<th>Username</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>City</th>
								<th>Country</th>
								<th>Phone Number</th>
								<th>Email</th>
								<th>User Type</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{currentUsers.map((user) => (
								<tr key={user.username}>
									<td>
										<Image
											src={user.avatar_url}
											alt="avatar"
											className={userStyles.avatar}
											width={40}
											height={40}
										/>
									</td>
									<td>{user.username}</td>
									<td>{user.first_name}</td>
									<td>{user.last_name}</td>
									<td>{user.city}</td>
									<td>{user.country}</td>
									<td>{user.phone_number}</td>
									<td>{user.email}</td>
									<td>
										<select
											value={user.user_type}
											onChange={(e) =>
												updateUserType(user.email, e.target.value)
											}
											disabled={loading}>
											<option value="customer">Customer</option>
											<option value="chef">Chef</option>
											<option value="admin">Admin</option>
											<option value="cashier">Cashier</option>
										</select>
									</td>
									<td>
										<button
											onClick={() => deleteUser(user.email)}
											disabled={loading}>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className={userStyles.pagination}>
						{Array.from(
							{ length: Math.ceil(users.length / usersPerPage) },
							(_, index) => (
								<button
									key={index + 1}
									onClick={() => paginate(index + 1)}
									className={
										currentPage === index + 1 ? userStyles.activePage : ""
									}
									disabled={loading}>
									{index + 1}
								</button>
							),
						)}
					</div>
					<div className={userStyles.charts}>
						<div className={userStyles.chart}>
							<h2>Users by City</h2>
							<canvas ref={cityChartRef}></canvas>
						</div>
						<div className={userStyles.chart}>
							<h2>Users by Type</h2>
							<canvas ref={userTypeChartRef}></canvas>
						</div>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
};

export default UsersPage;
