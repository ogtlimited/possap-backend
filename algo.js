// function LRUCache(strArr) {
//   // code goes here
//   let cache = [];
//   for (let i of strArr) {
//     if (cache.includes(i)) {
//       let index = cache.indexOf(i);
//       cache.splice(index, 1);
//       cache.push(i);
//       if (cache.length > 5) {
//         cache.splice(0, 1);
//       }
//     } else {
//       cache.push(i);
//       if (cache.length > 5) {
//         cache.splice(0, 1);
//       }
//     }
//   }
//   return cache.join('-').toString();
// }

// // keep this function call here
// console.log(LRUCache(readline()));
// {
//   "data": [
//       {
//           "id": 1,
//           "name": "Police Character Certificate",
//           "approvalWorkFlow": [
//               "First character certificate approval (DIG)",
//               "Second character certificate approval (CP CCR)",
//               "Third character certificate approval - Biometric Capture (SCID)",
//               "Fourth character certificate approval (DA CCR)",
//               "Fifth character certificate approval (CP CCR)",
//               "Secretariat Routing"
//           ],
//           "formSchema": null
//       },
//       {
//           "id": 2,
//           "name": "Police Extract",
//           "approvalWorkFlow": [
//               "Extract First Approval",
//               "Extract Second Approval"
//           ],
//           "formSchema": null
//       }
//   ]
// }
