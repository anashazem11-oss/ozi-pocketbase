/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const customerEmail = e.record.get("customer_email");
  const customerName = e.record.get("customer_name");
  const customerPhone = e.record.get("customer_phone");
  const travelDate = e.record.get("travel_date");
  const price = e.record.get("price");
  const serviceType = e.record.get("service_type");
  const serviceId = e.record.get("service_id");
  
  // Build service details based on service type
  let serviceDetails = "";
  if (serviceType === "hotel") {
    serviceDetails = "Hotel Booking";
  } else if (serviceType === "safari") {
    serviceDetails = "Safari Tour";
  } else if (serviceType === "bus") {
    serviceDetails = "Bus Ticket";
  }
  
  // Customer confirmation email
  const customerMessage = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: customerEmail }],
    subject: "Booking Confirmation - Ozi Travel Egypt",
    html: `
      <h2>Booking Confirmation</h2>
      <p>Dear ${customerName},</p>
      <p>Thank you for your booking with Ozi Travel Egypt. Here are your booking details:</p>
      <hr>
      <p><strong>Booking ID:</strong> ${e.record.id}</p>
      <p><strong>Service Type:</strong> ${serviceDetails}</p>
      <p><strong>Travel Date:</strong> ${travelDate}</p>
      <p><strong>Total Price:</strong> EGP ${price}</p>
      <p><strong>Status:</strong> ${e.record.get("status")}</p>
      <hr>
      <p>We will contact you shortly to confirm your booking details.</p>
      <p>If you have any questions, please don't hesitate to contact us.</p>
      <p>Best regards,<br>Ozi Travel Egypt Team</p>
    `
  });
  
  // Admin notification email
  const adminMessage = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: "reservation@ozitravel-egypt.com" }],
    subject: "New Booking - " + customerName,
    html: `
      <h2>New Booking Received</h2>
      <p><strong>Booking ID:</strong> ${e.record.id}</p>
      <hr>
      <h3>Customer Information</h3>
      <p><strong>Name:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <p><strong>Phone:</strong> ${customerPhone}</p>
      <hr>
      <h3>Booking Details</h3>
      <p><strong>Service Type:</strong> ${serviceDetails}</p>
      <p><strong>Service ID:</strong> ${serviceId}</p>
      <p><strong>Travel Date:</strong> ${travelDate}</p>
      <p><strong>Total Price:</strong> EGP ${price}</p>
      <p><strong>Status:</strong> ${e.record.get("status")}</p>
      <hr>
      <p>Please review and process this booking accordingly.</p>
    `
  });
  
  try {
    $app.newMailClient().send(customerMessage);
    $app.newMailClient().send(adminMessage);
  } catch (err) {
    console.log("Email sending error: " + err.message);
  }
  
  e.next();
}, "bookings");