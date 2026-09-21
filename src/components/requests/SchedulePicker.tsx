const SchedulePicker = () => {
  const slots = ["9 AM - 11 AM", "11 AM - 1 PM", "2 PM - 4 PM", "4 PM - 6 PM"];

  return (
    <div className="space-y-4">
      <label className="font-semibold">Preferred Schedule</label>

      <input
        type="date"
        className="
                input
                input-bordered
                w-full
                "
      />

      <div className="grid gap-3 md:grid-cols-2">
        {slots.map((slot) => (
          <label key={slot} className="cursor-pointer">
            <input
              type="radio"
              name="time"
              value={slot}
              className="peer hidden"
            />

            <div
              className="
                                rounded-lg
                                border
                                p-3
                                text-center
                                peer-checked:border-primary
                                peer-checked:bg-primary/10
                                "
            >
              {slot}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SchedulePicker;
