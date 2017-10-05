using gcVisionApi.Web.Models.Domain;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace gcVisionApi.Web.Services
{
    public class VisionService : IVisionService
    {
        public ApiKey SelectApiKey()
        {
            ApiKey model = new ApiKey();
            using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("dbo.SelectApiKey", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlDataReader reader = cmd.ExecuteReader();
                    if (reader.Read())
                        model = Mapper(reader);
                }
                conn.Close();
            }
            return model;
        }
        private ApiKey Mapper(SqlDataReader reader)
        {
            ApiKey model = new ApiKey();
            int index = 0;

            model.Id = reader.GetInt32(index++);
            model.Setting = reader.GetString(index++);
            model.Value = reader.GetString(index++);

            return model;
        }
    }
}