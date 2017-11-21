﻿using Hivemind.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hivemind.Providers
{
    public class UserProvider : HivemindProvider
    {
        public User AddUser(User user)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                using (var command = new SqlCommand("Gangs_AddGang", connection))
                {
                    connection.Open();

                    command.CommandType = CommandType.StoredProcedure;
                    var userGuid = command.Parameters.Add("@UserGUID", SqlDbType.NVarChar, 100);
                    userGuid.Direction = ParameterDirection.Output;
                    command.Parameters.Add("@Username", SqlDbType.NVarChar).Value = user.Username;
                    command.Parameters.Add("@Password", SqlDbType.Int).Value = user.Password;
                    command.ExecuteNonQuery();

                    user.UserGUID = (string)userGuid.Value;

                    return user;
                }
            }
        }

        public User GetUserByGuid(string guid)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                using (var command = new SqlCommand("Users_GetByGuid", connection))
                {
                    connection.Open();

                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@UserGUID", SqlDbType.NVarChar, 100).Value = guid.ToString();
                    var reader = command.ExecuteReader();

                    return GetUserFromReader(reader);
                }
            }
        }

        public User GetUserByUsername(string username)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                using (var command = new SqlCommand("Users_GetByUsername", connection))
                {
                    connection.Open();

                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@Username", SqlDbType.NVarChar, 100).Value = username;
                    var reader = command.ExecuteReader();

                    return GetUserFromReader(reader);
                }
            }
        }

        public IEnumerable<string> GetGangsByUserGuid(string guid)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                using (var command = new SqlCommand("UserGangs_GetByUserGuid", connection))
                {
                    connection.Open();

                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@UserGUID", SqlDbType.NVarChar, 100).Value = guid.ToString();
                    var reader = command.ExecuteReader();

                    var gangList = new List<string>();
                    while (reader.Read())
                    {
                        var value = reader.GetOrdinal("gangId");
                        gangList.Add(reader.GetString(value));
                    }

                    return gangList;
                }
            }
        }

        private User GetUserFromReader(SqlDataReader reader)
        {
            var user = new User();
            if (reader.Read())
            {
                var value = reader.GetOrdinal("userId");
                user.UserId = reader.GetInt32(value);

                value = reader.GetOrdinal("username");
                user.Username = reader.GetString(value);

                value = reader.GetOrdinal("password");
                user.Password = reader.GetString(value);

                value = reader.GetOrdinal("userGUID");
                user.UserGUID = reader.GetString(value);
            }
            else
            {
                return null;
            }

            return user;
        }
    }
}