using System;
using System.Collections.Generic;
using UsedCarSalesPortal.Model;

namespace UsedCarSalesPortal.Services
{
    public class VehicleService
    {
        private List<Vehicles>? vehicleList;

        public VehicleService()
        {
            InitializeVehicleList();
        }

        private void InitializeVehicleList()
        {
            vehicleList = new List<Vehicles>();

            for (int i = 1; i <= 5; i++)
            {
                Vehicles vehicle = new Vehicles
                {
                    VehicleUniqueId = Guid.NewGuid(),
                    VehicleName = $"Sample Vehicle {i}",
                    VehicleModelId = 1,
                    VehicleStatusId = 1,
                    VehicleTypeId = 1,
                    Price = 20000 + i * 1000,
                    VehicleImage = $"image{i}.jfif",
                    SellerName = $"Seller {i}"
                };

                vehicleList.Add(vehicle);
            }
        }

        public List<Vehicles>? GetFeaturedVehicles()
        {
            return vehicleList;
        }
    }
}
