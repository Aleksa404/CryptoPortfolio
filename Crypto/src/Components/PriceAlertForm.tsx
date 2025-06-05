import { setPriceAlert } from "@/api";
import React, { useState } from "react";

interface PriceAlertFormProps {
  coinId: string;
}

const PriceAlertForm: React.FC<PriceAlertFormProps> = ({ coinId }) => {
  const [email, setEmail] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const pricealert = {
        email: email,
        targetPrice: parseFloat(targetPrice),
        coinId: coinId,
      };
      const response = await setPriceAlert(pricealert);
      console.log("Response:", response);

      if (response.status === 200 || response.status === 201) {
        setStatus("success");
        setEmail("");
        setTargetPrice("");
      } else {
        throw new Error("Failed to create alert");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md p-4 bg-white shadow rounded display-flex flex-col gap-4 mx-auto my-6"
    >
      <h2 className="text-xl font-semibold mb-2 justify-center text-center">
        Set Price Alert
      </h2>

      <div className="mb-3">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium">Target Price (USD)</label>
        <input
          type="number"
          step="0.01"
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 content-center"
      >
        {status === "loading" ? "Saving..." : "Set Alert"}
      </button>

      {status === "success" && (
        <p className="mt-2 text-green-600">Alert created!</p>
      )}
      {status === "error" && (
        <p className="mt-2 text-red-600">Something went wrong.</p>
      )}
    </form>
  );
};

export default PriceAlertForm;
