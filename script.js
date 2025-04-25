const formWrapper = document.querySelector(".form__fields");

const supabaseUrl = "https://eqznnarpanrfzwzjgksq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxem5uYXJwYW5yZnp3empna3NxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1NjU3NDMsImV4cCI6MjA2MTE0MTc0M30.cqB9D02UwuZ7pNpsr-NwtkmLV9W2VJ78X7Fw8QIstbU";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

function createInputField(type, name, status, id) {
  const inputWrapper = document.createElement("div");
  inputWrapper.classList.add("input__wrapper");

  const inputTitle = document.createElement("div");
  inputTitle.classList.add("input__title");
  inputTitle.textContent = name;

  const itemWrapper = document.createElement("div");
  itemWrapper.classList.add("item__wrapper");

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.checked = status;
  checkBox.addEventListener("change", async (e) => {
    await supabase
      .from("Fields")
      .update({ status: e.target.checked })
      .eq("id", id)
      .select();
  });

  let item = document.createElement("input");
  switch (type) {
    case "text":
      item.type = "text";
      break;
    case "date":
      item = document.createElement("div");

      createCalendar({
        container: item,
        initialDate: new Date(),
        selectedDates: [new Date()],
        onDateSelect: (data) => console.log("Selected:", data.selectedDates),
        width: "300px", // попробуйте уменьшить
        height: "400px",
        tdPadding: "12px",
      });

      break;
  }

  itemWrapper.append(checkBox);
  itemWrapper.append(item);

  inputWrapper.append(inputTitle);
  inputWrapper.append(itemWrapper);

  return inputWrapper;
}

(async () => {
  const fields = (await supabase.from("Fields").select("*")).data.sort(
    (a, b) => a.id - b.id
  );

  for (const field of fields) {
    console.log(field.type);
    const inputField = createInputField(
      field.type,
      field.name,
      field.status,
      field.id
    );
    formWrapper.append(inputField);
  }
})();
