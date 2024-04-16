export interface MoreNutrients {
    calories: number,
    totalNutrients: {
        ENERC_KCAL: {
            label: string,
            quantity: number,
            unit: string,
          },
          FAT: {
            label: string,
            quantity: number,
            unit: string,
          },
          FASAT: {
            label: string,
            quantity: number,
            unit: string,
          },
          FATRN: {
            label: string,
            quantity: number,
            unit: string,
          },
          CHOCDF: {
            label: string,
            quantity: number,
            unit: string,
          },
          "CHOCDF.net": {
            label: string,
            quantity: number,
            unit: string,
          },
          FIBTG: {
            label: string,
            quantity: number,
            unit: string,
          },
          SUGAR: {
            label: string,
            quantity: number,
            unit: string,
          },
          PROCNT: {
            label: string,
            quantity: number,
            unit: string,
          },
          CHOLE: {
            label: string,
            quantity: number,
            unit: string,
          },
          NA: {
            label: string,
            quantity: number,
            unit: string,
          },
          FE: {
            label: string,
            quantity: number,
            unit: string,
          },
          NIA: {
            label: string,
            quantity: number,
            unit: string,
          },
          TOCPHA: {
            label: string,
            quantity: number,
            unit: string,
          }
        },
        totalDaily: {
          ENERC_KCAL: {
            label: string,
            quantity: number,
            unit: string,
          },
          FAT: {
            label: string,
            quantity: number,
            unit: string,
          },
          FASAT: {
            label: string,
            quantity: number,
            unit: string,
          },
          CHOCDF: {
            label: string,
            quantity: number,
            unit: string,
          },
          FIBTG: {
            label: string,
            quantity: number,
            unit: string,
          },
          PROCNT: {
            label: string,
            quantity: number,
            unit: string,
          },
          CHOLE: {
            label: string,
            quantity: number,
            unit: string,
          },
          NA: {
            label: string,
            quantity: number,
            unit: string,
          },
          FE: {
            label: string,
            quantity: number,
            unit: string,
          },
          NIA: {
            label: string,
            quantity: number,
            unit: string,
          },
          TOCPHA: {
            label: string,
            quantity: number,
            unit: string,
          },
          VITD: {
            label: string,
            quantity: number,
            unit: string,
          },
          CA: {
            label: string,
            quantity: number,
            unit: string,
          },
          K: {
            label: string,
            quantity: number,
            unit: string,
          },
          VITC: {
            label: string,
            quantity: number,
            unit: string,
          }
    },
    ingredients: [
      {
        parsed: [
          {
            quantity: number,
            measure: string,
            food: string,
            foodId: string,
            brand: string,
            foodContentsLabel: string,
            weight: number,
            retainedWeight: number,
            servingSizes: [
              {
                uri: string,
                label: string,
                quantity: number
              },
              {
                uri: string,
                label: string,
                quantity: number
              }
            ],
            servingsPerContainer: number,
            measureURI: string,
            status: string
          }
        ]
      }
    ]
}
