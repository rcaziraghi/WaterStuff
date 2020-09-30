import React, { useState } from "react";
import DatePicker from "react-datepicker";

const DataNascimento = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={startDate}
        locale="pt-BR"
        onChange={date => setStartDate(date)}
      />
    );
  };

  export default DataNascimento;