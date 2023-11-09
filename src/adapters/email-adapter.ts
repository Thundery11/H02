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
      to: email, // list of receivers
      subject: subject, // Subject line
      html: message, // html body
    });
    console.log(info);
    return info;
  },
};
