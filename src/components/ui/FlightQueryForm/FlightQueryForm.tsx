import {
  IconChevronRight,
  IconPlaneArrival,
  IconPlaneDeparture,
} from "@tabler/icons-react";
import { useState } from "react";
import * as yup from "yup";
import { CabinAndPassengerSelect, Combobox, Datepicker, Modal } from "..";
import styles from "./FlightQueryForm.module.scss";
import { useLocalStorage } from "@/hooks";
import { useNavigate } from "react-router-dom";

interface FlightQueryFormProps {
  origin: Destination | null;
  destination: Destination | null;
  options: CabinAndPassengerValueProps;
}

export default function FlightQueryForm() {
  const [form, setForm] = useState<FlightQueryFormProps>({
    origin: null,
    destination: null,
    options: { cabin: "economy", passengers: 1 },
  });
  const [showError, setShowError] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useLocalStorage(
    "previusSearches",
    "[]"
  );
  const navigate = useNavigate();

  const schema = yup.object().shape({
    origin: yup.object().nullable().required("Nereden alanı zorunludur."),
    destination: yup.object().nullable().required("Nereye alanı zorunludur."),
  });

  const [errorDetail, setErrorDetail] = useState<string | undefined>(undefined);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    schema
      .validate(form, { abortEarly: false })
      .then(() => {
        const newSearchHistory = JSON.parse(searchHistory);
        newSearchHistory.push(form);
        setSearchHistory(JSON.stringify(newSearchHistory));
        navigate("/flights", { state: { form } });
      })
      .catch((error) => {
        setErrorDetail((error as yup.ValidationError).errors.join(" "));
        setShowError(true);
      });
  };

  const handleOriginChange = (value: Destination | null) => {
    setForm((prevForm) => ({ ...prevForm, origin: value }));
  };

  const handleDestinationChange = (value: Destination | null) => {
    setForm((prevForm) => ({ ...prevForm, destination: value }));
  };

  const handleOptionsChange = (value: CabinAndPassengerValueProps) => {
    setForm({ ...form, options: value });
  };

  return (
    <form className={styles.root} onSubmit={handleFormSubmit}>
      <Combobox
        selected={form.origin}
        onChange={handleOriginChange}
        leftSection={
          <IconPlaneDeparture size={24} stroke={2} color="#98a1ae" />
        }
        placeholder="Nereden"
      />
      <Combobox
        selected={form.destination}
        onChange={handleDestinationChange}
        leftSection={<IconPlaneArrival size={24} stroke={2} color="#98a1ae" />}
        placeholder="Nereye"
      />
      <Datepicker placeholder="Tarih" />
      <CabinAndPassengerSelect
        value={form.options}
        onChange={handleOptionsChange}
      />
      <button type="submit" className={styles.submitButton}>
        <IconChevronRight size={24} stroke={2} color="#fff" />
      </button>

      <Modal isOpen={showError} onClose={() => setShowError(false)}>
        {errorDetail && <p>{errorDetail}</p>}
      </Modal>
    </form>
  );
}
