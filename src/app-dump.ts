// // const hash = createHash('sha256').update('POSSAP3U4.4)9434=)@9345K9hjer34&5%34::servicernumber:FN23233').digest('hex');
//     // const signature = Buffer.from(hash).toString('base64');
//     const data = {
//         ServiceNumber: 'AP205599',
//       };

//       const hash = createHash('sha256')
//         .update('POSSAP3U4.4)9434=)@9345K9hjer34&5%34::' + data['ServiceNumber'])
//         .digest('hex');

//       const md5 = data => createHash('md5').update(data).digest('hex');
//       const bvnHash = data => createHash('sha256').update(data).digest('hex');
//       const signature = Buffer.from(hash).toString('base64');
//       const BVNValidationUsername = process.env.FourCoreBVNValidationUsername;
//       const BVNValidationSecret = process.env.FourCoreBVNValidationSecret;
//       const date = new Date();
//       const year = date.getFullYear();
//       const month = date.getMonth() + 1;
//       const day = date.getDate();
//       const formatString = formatBVN(BVNValidationUsername, year, month, day);
//       console.log('formatString', formatString);
//       const mdHash = CreateMD5Hash(formatString);
//       const signatureHash = Sha256Hash(mdHash);

//       console.log('signature hash', signatureHash);

// const mdfive = md5('BVNValidationUsername::202342');
//     const mdfhash = bvnHash(mdfive);
//     console.log('MD5 = ', mdfive);
//     console.log('BVN = ', mdfhash);

//     console.log('expert system', HMAC256Hash('rqJ/KwxvhgHwy+ELZwFeH8lhSISonjXhb/O+GWGvuFzFzX1OonPP8jiR+pWF', '1'));

//   axios
//     .get('http://52.15.120.183/verify.php?pickNIN=30919176644&key=t/BLOvt6c95mV20ka1pqreVkrwprcbdb')
//     .then(res => console.log(res.data))
//     .catch(error => console.log(error.response));
