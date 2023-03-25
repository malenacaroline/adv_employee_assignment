const dateCheckRegex = new RegExp("^\\d\\d\\d\\d-\\d\\d-\\d\\d");
const jsonDateChecker = (key, value) => {
  if (dateCheckRegex.test(value)) return new Date(value);
  return value;
};

// Request to api
export default async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch(window.ENV.CLIENT_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateChecker);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code === "BAD_USER_INPUT") {
        const details = error.extensions.exception.errors.join("\n ");
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    return alert(`Error in sending data to server: ${e.message}`);
  }
}
