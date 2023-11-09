import nodemailer from "nodemailer";
export const emailAdapter = {
  async sendEmail(login: string, password: string, email: string) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nizovtsovillia@gmail.com",
        pass: "fhtc eten opez paig",
      },
    });

    const info = await transporter.sendMail({
      from: "Illia <nizovtsovillia@gmail.com>", // sender address
      to: email, // list of receivers // Subject line
      html: " <h1>Thank for your registration</h1><p>To finish registration please follow the link below:<a href='https://somesite.com/confirm-email?code=your_confirmation_code'>complete registration</a> </p>",
    });
    console.log(info);
    return info;
  },
};
