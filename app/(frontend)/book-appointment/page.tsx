"use client";

import { InlineWidget } from "react-calendly";

export default function BookAppointment() {
  return (
    <div className="h-screen">
      <InlineWidget 
        url="https://calendly.com/bijonsingh381/new-meeting"
        styles={{
          height: "100vh"
        }}
      />
    </div>
  );
}
