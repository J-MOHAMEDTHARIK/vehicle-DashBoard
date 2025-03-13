import React, { useState, useEffect } from "react";
import {
  db,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "../Firebase";
import Header from "../components/common/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductsPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [newDriver, setNewDriver] = useState({
    name: "",
    age: "",
    bus: "",
    phone: "",
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDrivers();
  }, []);

  useEffect(() => {
    // Filter drivers based on search query
    setFilteredDrivers(
      drivers.filter(
        (driver) =>
          driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          driver.bus.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, drivers]);

  const fetchDrivers = async () => {
    const querySnapshot = await getDocs(collection(db, "drivers"));
    const driversList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDrivers(driversList);
    setFilteredDrivers(driversList);
  };

  const addDriver = async () => {
    if (
      !newDriver.name ||
      !newDriver.age ||
      !newDriver.bus ||
      !newDriver.phone
    ) {
      toast.error("Please fill all fields");
      return;
    }
    await addDoc(collection(db, "drivers"), newDriver);
    setNewDriver({ name: "", age: "", bus: "", phone: "" });
    fetchDrivers();
    toast.success("Driver added successfully!");
  };

  const deleteDriver = async (id) => {
    await deleteDoc(doc(db, "drivers", id));
    fetchDrivers();
    toast.success("Driver deleted!");
  };

  const startEdit = (driver) => {
    setEditing(true);
    setEditId(driver.id);
    setNewDriver({
      name: driver.name,
      age: driver.age,
      bus: driver.bus,
      phone: driver.phone,
    });
  };

  const updateDriver = async () => {
    await updateDoc(doc(db, "drivers", editId), newDriver);
    setNewDriver({ name: "", age: "", bus: "", phone: "" });
    setEditing(false);
    setEditId(null);
    fetchDrivers();
    toast.success("Driver updated!");
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 text-white">
      <Header title="Drivers Details" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Search Box */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Name or Bus Number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white w-full"
          />
        </div>

        {/* Input Fields */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newDriver.name}
              onChange={(e) =>
                setNewDriver({ ...newDriver, name: e.target.value })
              }
              className="p-2 rounded bg-gray-700 text-white w-full"
            />
            <input
              type="number"
              placeholder="Age"
              value={newDriver.age}
              onChange={(e) =>
                setNewDriver({ ...newDriver, age: e.target.value })
              }
              className="p-2 rounded bg-gray-700 text-white w-full"
            />
            <input
              type="text"
              placeholder="Bus Number"
              value={newDriver.bus}
              onChange={(e) =>
                setNewDriver({ ...newDriver, bus: e.target.value })
              }
              className="p-2 rounded bg-gray-700 text-white w-full"
            />
            <input
              type="text"
              placeholder="Phone"
              value={newDriver.phone}
              onChange={(e) =>
                setNewDriver({ ...newDriver, phone: e.target.value })
              }
              className="p-2 rounded bg-gray-700 text-white w-full"
            />
          </div>
          <button
            onClick={editing ? updateDriver : addDriver}
            className={`mt-4 px-6 py-2 rounded-md text-white font-bold ${
              editing ? "bg-blue-600" : "bg-green-600"
            } hover:opacity-80`}
          >
            {editing ? "Update Driver" : "Add Driver"}
          </button>
        </div>

        {/* Table */}
        <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-3">Name</th>
                <th className="p-3">Age</th>
                <th className="p-3">Bus</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.length > 0 ? (
                filteredDrivers.map((driver) => (
                  <tr key={driver.id} className="border-b border-gray-600">
                    <td className="p-3">{driver.name}</td>
                    <td className="p-3">{driver.age}</td>
                    <td className="p-3">{driver.bus}</td>
                    <td className="p-3">{driver.phone}</td>
                    <td className="p-3">
                      <button
                        onClick={() => startEdit(driver)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md mr-2 hover:opacity-80"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteDriver(driver.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:opacity-80"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-3 text-gray-400">
                    No matching results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <ToastContainer />
      </main>
    </div>
  );
};

export default ProductsPage;
