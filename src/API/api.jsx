const panValidation = async (pan) => {
    const response = await fetch(
          "https://lab.pixel6.co/api/verify-pan.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ panNumber: pan }),
          }
        );
  
    
    return response;
  };

  const postcodeValidation=async(code)=>{
    const response = await fetch(
        "https://lab.pixel6.co/api/get-postcode-details.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postcode: code }),
        }
      );
      return response;
  }

  export {panValidation,postcodeValidation};