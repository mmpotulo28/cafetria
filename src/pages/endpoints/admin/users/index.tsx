import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import AdminLayout from "@/components/AdminLayout";
import styles from "../admin.module.css";
import userStyles from "./users.module.css";
import { iUserProfile } from "@/lib/Type";
import Image from "next/image";

const UsersPage: React.FC = () => {
	const { data: session } = useSession();
	const [users, setUsers] = useState<iUserProfile[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const usersPerPage = 9;

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

	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;
	const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<AdminLayout>
			<div className={styles.dashboardCards}>
				<div className={userStyles.users}>
					<h3>Users</h3>
					<table className={userStyles.usersTable}>
						<thead>
							<tr>
								<th>Username</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>City</th>
								<th>Country</th>
								<th>Avatar</th>
								<th>Phone Number</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							{currentUsers.map((user) => (
								<tr key={user.username}>
									<td>{user.username}</td>
									<td>{user.first_name}</td>
									<td>{user.last_name}</td>
									<td>{user.phone_number}</td>
									<td>{user.email}</td>
									<td>{user.city}</td>
									<td>{user.country}</td>
									<td>
										<Image
											src={user.avatar_url}
											alt="avatar"
											className={userStyles.avatar}
											width={40}
											height={40}
										/>
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
									}>
									{index + 1}
								</button>
							),
						)}
					</div>
				</div>
			</div>
		</AdminLayout>
	);
};

export default UsersPage;
