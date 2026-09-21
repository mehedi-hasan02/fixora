const ProblemDescription = () => {
  return (
    <div className="space-y-4">
      <div>
        <label className="font-semibold">Problem Title</label>

        <input
          type="text"
          placeholder="Example: Bathroom tap leaking"
          className="input input-bordered mt-2 w-full"
        />
      </div>

      <div>
        <label className="font-semibold">Describe Your Problem</label>

        <textarea
          placeholder="
Explain what happened...
"
          rows={5}
          className="
                    textarea
                    textarea-bordered
                    mt-2
                    w-full
                    "
        />
      </div>
    </div>
  );
};

export default ProblemDescription;
