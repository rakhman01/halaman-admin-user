import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_USER, USERS_QUERY, USER_QUERY } from "../Api/tabel/query";
import Loading from "./Loading";
import Error from "../Api/Error";
import Cookies from "js-cookie";

export default function TableAdmin() {
  const { loading, error, data } = useQuery(USERS_QUERY);
  const [deleteuser] = useMutation(DELETE_USER);

  const handleRefresh = () => {
    return window.location.reload(true);
  };

  const handledeleteuser = (id) => {
    console.log(Cookies.get("token"));
    try {
      deleteuser({ variables: { id: id } }).then((r) => {
        console.log(r);
        handleRefresh();
      });
    } catch (error) {
      console.log(error, "error");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Title table  */}
              <thead className="bg-yellow-300">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  {/* <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
          >
            Title
          </th> */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 font-bold text-sm  text-left text-gray-700 uppercase tracking-wider"
                  >
                    <span className="uppercase">Number Phone</span>
                  </th>
                  <th
                    scope="col"
                    className="relative px-6 py-3 font-bold text-sm text-gray-700 uppercase"
                  >
                    <span className="">Edit</span>
                  </th>
                  <th
                    scope="col"
                    className="relative px-6 py-3 text-gray-700 uppercase"
                  >
                    <span className="uppercase">delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-200 divide-y divide-gray-200">
                {data.users.map((person) => (
                  <tr key={person.name}>
                    {/* {console.log(person.id, "data user")} */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={person.image}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {person.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {person.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{person.title}</div>
              <div className="text-sm text-gray-500">{person.department}</div>
            </td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.role}
                    </td>
                    <td className=" px-6 py-4 whitespace-nowrap  text-sm font-medium">
                      <a
                        href="#"
                        className="text-gray-500 hover:text-indigo-900"
                      >
                        {person.phoneNumber}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </a>
                    </td>
                    <button
                      className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-indigo-600 hover:text-indigo-900"
                      onClick={() => handledeleteuser(person.id)}
                      type="button"
                    >
                      Delete
                    </button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
