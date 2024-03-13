import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { type OrderGetListByEmailQuery } from "@/gql/graphql";
import { OrderGetListByEmail } from "@/api/orders";
import { formatMoney } from "@/utils";


export default async function OrderPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) {
    return <div>User does not have email</div>;
  }

  const response: OrderGetListByEmailQuery = await OrderGetListByEmail(email, 10, 0);

  if (!response || response.orders.data.length === 0) {
    return (
      <div>
        <h2>No orders</h2>
      </div>
    );
  }

  const orders = response.orders.data;
  return (
    <>
      <h1 className="mt-2 mb-2 font-bold">{user.emailAddresses[0].emailAddress}&rsquo;s My orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-center dark:text-gray-800">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center dark:text-gray-800">{new Date(order.createdAt as string).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center dark:text-gray-800">{order.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center dark:text-gray-800">{formatMoney(order.totalAmount)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center dark:text-gray-800">{new Date(order.updatedAt as string).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
