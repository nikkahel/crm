const apiToken = '84432ad7077f339bb629a6d1a974013ef03f52e8'; // Replace with your actual Pipedrive API token.
const apiUrl = 'https://api.pipedrive.com/v1';

async function createDeal() {
  const firstName = document.getElementById('First_name').value;
  const lastName = document.getElementById('Last_name').value;
  const phone = document.getElementById('Phone').value;
  const email = document.getElementById('Email').value;
  const jobType = document.getElementById('job_type').value;
  const jobSource = document.getElementById('job_source').value;
  const jobDes = document.getElementById('job_description').value;
  const address = document.getElementById('address').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const zip = document.getElementById('postcode').value;
  const area = document.getElementById('area').value;
  const date = document.getElementById('date').value;
  const startTime = document.getElementById('start_time').value;
  const endTime = document.getElementById('end_time').value;
  const tech = document.getElementById('tech').value;

  const title = `${firstName} ${lastName}`;

  const dealData = {
    title: title,
    person_name: `${firstName} ${lastName}`,
    phone: phone,
    email: email,
    // Add more fields based on your Pipedrive setup.
    address: address,
    job_type: jobType,
    job_source: jobSource,
    job_description: jobDes,
    due_date: date, // Use the date value you extracted from the HTML input field.
    start_date_time: startTime, // Use the start time value you extracted from the HTML input field.
    end_date_time: endTime, // Use the end time value you extracted from the HTML input field.
  };

  try {
    const response = await fetch(`${apiUrl}/deals?api_token=${apiToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dealData),
    });

    if (!response.ok) {
      throw new Error('Failed to create deal in Pipedrive.');
    }

    alert('Deal created successfully in Pipedrive!');
  } catch (error) {
    console.error(error);
    alert('Failed to create deal in Pipedrive. Please try again later.');
  }
}