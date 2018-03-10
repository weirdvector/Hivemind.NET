﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Hivemind.Entities;
using System.Data.SqlClient;
using Hivemind.Enums;
using System.Data;

namespace Hivemind.Providers
{
    public class WeaponProvider : HivemindProvider
    {
        public Weapon GetById(int weaponId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                using (var command = new SqlCommand("Weapons_GetById", connection))
                {
                    connection.Open();

                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@WeaponId", SqlDbType.Int).Value = weaponId;
                    var reader = command.ExecuteReader();

                    var weapon = GetWeaponFromReader(reader);

                    return weapon;
                }
            }
        }

        public IEnumerable<Weapon> GetAllWeapons()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                using (var command = new SqlCommand("Weapons_GetAll", connection))
                {
                    connection.Open();

                    command.CommandType = CommandType.StoredProcedure;
                    var reader = command.ExecuteReader();

                    var weapons = GetWeaponListFromReader(reader);

                    return weapons;
                }
            }
        }

        public IEnumerable<GangerWeapon> GetByGangId(string gangId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                using (var command = new SqlCommand("GangerWeapons_GetByGangId", connection))
                {
                    connection.Open();

                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@GangId", SqlDbType.NVarChar, 100).Value = gangId;

                    var reader = command.ExecuteReader();

                    return GetGangerWeaponListFromReader(reader, GetGangerWeaponLimitedInformationFromReader);
                }
            }
        }

        public GangWeapon AddGangWeapon(GangWeapon gangWeapon)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                using (var command = new SqlCommand("GangWeapons_AddGangWeapon", connection))
                {
                    connection.Open();

                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@GangId", SqlDbType.NVarChar, 100).Value = gangWeapon.GangId;
                    command.Parameters.Add("@WeaponId", SqlDbType.Int).Value = gangWeapon.Weapon.WeaponEnum;
                    var gangWeaponId = command.Parameters.Add("@GangWeaponId", SqlDbType.NVarChar, 100);
                    gangWeaponId.Direction = ParameterDirection.Output;

                    var reader = command.ExecuteNonQuery();

                    gangWeapon.GangWeaponId = (string)gangWeaponId.Value;
                    return gangWeapon;
                }
            }
        }

        public void RemoveGangWeapon(string gangWeaponId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                using (var command = new SqlCommand("GangWeapons_RemoveGangWeapon", connection))
                {
                    connection.Open();

                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@GangWeaponId", SqlDbType.NVarChar, 100).Value = gangWeaponId;
                    command.ExecuteNonQuery();
                }
            }
        }

        public IEnumerable<Weapon> GetGangStash(string gangId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                using (var command = new SqlCommand("Weapons_GetGangStash", connection))
                {
                    connection.Open();

                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@GangId", SqlDbType.NVarChar, 100).Value = gangId;

                    var reader = command.ExecuteReader();
                    return GetWeaponListFromReader(reader);
                }
            }
        }

        public IEnumerable<Weapon> GetGangerWeaponsByGangId(string gangId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                using (var command = new SqlCommand("Weapons_GetGangerWeaponsByGangId", connection))
                {
                    connection.Open();

                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@GangId", SqlDbType.NVarChar, 100).Value = gangId;

                    var reader = command.ExecuteReader();
                    return GetWeaponListFromReader(reader);
                }
            }
        }

        public GangerWeapon AddGangerWeapon(GangerWeapon gangerWeapon)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                using (var command = new SqlCommand("GangerWeapons_AddGangerWeapon", connection))
                {
                    connection.Open();

                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@GangerId", SqlDbType.NVarChar, 100).Value = gangerWeapon.GangerId;
                    command.Parameters.Add("@WeaponId", SqlDbType.Int).Value = gangerWeapon.Weapon.WeaponEnum;
                    var gangerWeaponId = command.Parameters.Add("@GangerWeaponId", SqlDbType.NVarChar, 100);
                    gangerWeaponId.Direction = ParameterDirection.Output;

                    var reader = command.ExecuteNonQuery();

                    gangerWeapon.GangerWeaponId = (string)gangerWeaponId.Value;
                    return gangerWeapon;
                }
            }
        }

        public void RemoveGangerWeapon(string gangerWeaponId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                using (var command = new SqlCommand("GangerWeapons_RemoveGangerWeapon", connection))
                {
                    connection.Open();

                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@GangerWeaponId", SqlDbType.NVarChar, 100).Value = gangerWeaponId;
                    command.ExecuteNonQuery();
                }
            }
        }

        public IEnumerable<GangerWeapon> GetGangerWeapons(string gangerId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                using (var command = new SqlCommand("Weapons_GetByGangerId", connection))
                {
                    connection.Open();

                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@GangerId", SqlDbType.NVarChar, 100).Value = gangerId;

                    var reader = command.ExecuteReader();
                    return GetGangerWeaponListFromReader(reader, GetGangerWeaponFromReader);
                }
            }
        }

        private IEnumerable<Weapon> GetWeaponListFromReader(SqlDataReader reader)
        {
            var weapons = new List<Weapon>();
            Weapon weapon;
            while ((weapon = GetWeaponFromReader(reader)) != null)
            {
                weapons.Add(weapon);
            }
            return weapons;
        }

        private Weapon GetWeaponFromReader(SqlDataReader reader)
        {
            var weapon = new Weapon();
            if (reader.Read())
            {
                var value = reader.GetOrdinal("weaponId");
                weapon.WeaponEnum = (WeaponEnum)reader.GetInt32(value);

                value = reader.GetOrdinal("weaponName");
                weapon.Name = reader.GetString(value);

                value = reader.GetOrdinal("shortRange");
                if (!reader.IsDBNull(value))
                {
                    weapon.ShortRange = reader.GetString(value);
                }

                value = reader.GetOrdinal("longRange");
                if (!reader.IsDBNull(value))
                {
                    weapon.LongRange = reader.GetString(value);
                }

                value = reader.GetOrdinal("hitShort");
                if (!reader.IsDBNull(value))
                {
                    weapon.HitShort = reader.GetString(value);
                }

                value = reader.GetOrdinal("hitLong");
                if (!reader.IsDBNull(value))
                {
                    weapon.HitLong = reader.GetString(value);
                }

                value = reader.GetOrdinal("strength");
                if (!reader.IsDBNull(value))
                {
                    weapon.Strength = reader.GetString(value);
                }

                value = reader.GetOrdinal("damage");
                if (!reader.IsDBNull(value))
                {
                    weapon.Damage = reader.GetString(value);
                }

                value = reader.GetOrdinal("saveMod");
                if (!reader.IsDBNull(value))
                {
                    weapon.SaveMod = reader.GetString(value);
                }

                value = reader.GetOrdinal("ammoRoll");
                if (!reader.IsDBNull(value))
                {
                    weapon.AmmoRoll = reader.GetString(value);
                }

                value = reader.GetOrdinal("type");
                weapon.WeaponType = (WeaponType)reader.GetInt32(value);

                value = reader.GetOrdinal("cost");
                weapon.Cost = reader.GetString(value);

                value = reader.GetOrdinal("availability");
                if (!reader.IsDBNull(value))
                {
                    weapon.WeaponAvailability = (WeaponAvailability)reader.GetInt32(value);
                }

                value = reader.GetOrdinal("description");
                if (!reader.IsDBNull(value))
                {
                    weapon.SpecialRules = reader.GetString(value);
                }
            }
            else
            {
                return null;
            }
            return weapon;
        }

        private IEnumerable<GangWeapon> GetGangWeaponListFromReader(SqlDataReader reader)
        {
            var gangWeapons = new List<GangWeapon>();
            GangWeapon weapon;
            while ((weapon = GetGangWeaponFromReader(reader)) != null)
            {
                gangWeapons.Add(weapon);
            }
            return gangWeapons;
        }

        private GangWeapon GetGangWeaponFromReader(SqlDataReader reader)
        {
            var gangWeapon = new GangWeapon();
            if (reader.Read())
            {
                var value = reader.GetOrdinal("weaponId");
                gangWeapon.Weapon.WeaponEnum = (WeaponEnum)reader.GetInt32(value);

                value = reader.GetOrdinal("weaponName");
                gangWeapon.Weapon.Name = reader.GetString(value);

                value = reader.GetOrdinal("shortRange");
                if (!reader.IsDBNull(value))
                {
                    gangWeapon.Weapon.ShortRange = reader.GetString(value);
                }

                value = reader.GetOrdinal("longRange");
                if (!reader.IsDBNull(value))
                {
                    gangWeapon.Weapon.LongRange = reader.GetString(value);
                }

                value = reader.GetOrdinal("hitShort");
                if (!reader.IsDBNull(value))
                {
                    gangWeapon.Weapon.HitShort = reader.GetString(value);
                }

                value = reader.GetOrdinal("hitLong");
                if (!reader.IsDBNull(value))
                {
                    gangWeapon.Weapon.HitLong = reader.GetString(value);
                }

                value = reader.GetOrdinal("strength");
                if (!reader.IsDBNull(value))
                {
                    gangWeapon.Weapon.Strength = reader.GetString(value);
                }

                value = reader.GetOrdinal("damage");
                if (!reader.IsDBNull(value))
                {
                    gangWeapon.Weapon.Damage = reader.GetString(value);
                }

                value = reader.GetOrdinal("saveMod");
                if (!reader.IsDBNull(value))
                {
                    gangWeapon.Weapon.SaveMod = reader.GetString(value);
                }

                value = reader.GetOrdinal("ammoRoll");
                if (!reader.IsDBNull(value))
                {
                    gangWeapon.Weapon.AmmoRoll = reader.GetString(value);
                }

                value = reader.GetOrdinal("type");
                gangWeapon.Weapon.WeaponType = (WeaponType)reader.GetInt32(value);

                value = reader.GetOrdinal("cost");
                gangWeapon.Weapon.Cost = reader.GetString(value);

                value = reader.GetOrdinal("availability");
                if (!reader.IsDBNull(value))
                {
                    gangWeapon.Weapon.WeaponAvailability = (WeaponAvailability)reader.GetInt32(value);
                }

                value = reader.GetOrdinal("description");
                if (!reader.IsDBNull(value))
                {
                    gangWeapon.Weapon.SpecialRules = reader.GetString(value);
                }

                value = reader.GetOrdinal("gangWeaponId");
                gangWeapon.GangWeaponId = reader.GetString(value);

                value = reader.GetOrdinal("gangId");
                gangWeapon.GangId = reader.GetString(value);
            }
            else
            {
                return null;
            }
            return gangWeapon;
        }

        private IEnumerable<GangerWeapon> GetGangerWeaponListFromReader(SqlDataReader reader, Func<SqlDataReader, GangerWeapon> parsingFunction)
        {
            var gangerWeapons = new List<GangerWeapon>();
            GangerWeapon weapon;
            while ((weapon = parsingFunction(reader)) != null)
            {
                gangerWeapons.Add(weapon);
            }
            return gangerWeapons;
        }

        private GangerWeapon GetGangerWeaponFromReader(SqlDataReader reader)
        {
            var gangerWeapon = new GangerWeapon();
            if (reader.Read())
            {
                var value = reader.GetOrdinal("weaponId");
                gangerWeapon.Weapon.WeaponEnum = (WeaponEnum)reader.GetInt32(value);

                value = reader.GetOrdinal("weaponName");
                gangerWeapon.Weapon.Name = reader.GetString(value);

                value = reader.GetOrdinal("shortRange");
                if (!reader.IsDBNull(value))
                {
                    gangerWeapon.Weapon.ShortRange = reader.GetString(value);
                }

                value = reader.GetOrdinal("longRange");
                if (!reader.IsDBNull(value))
                {
                    gangerWeapon.Weapon.LongRange = reader.GetString(value);
                }

                value = reader.GetOrdinal("hitShort");
                if (!reader.IsDBNull(value))
                {
                    gangerWeapon.Weapon.HitShort = reader.GetString(value);
                }

                value = reader.GetOrdinal("hitLong");
                if (!reader.IsDBNull(value))
                {
                    gangerWeapon.Weapon.HitLong = reader.GetString(value);
                }

                value = reader.GetOrdinal("strength");
                if (!reader.IsDBNull(value))
                {
                    gangerWeapon.Weapon.Strength = reader.GetString(value);
                }

                value = reader.GetOrdinal("damage");
                if (!reader.IsDBNull(value))
                {
                    gangerWeapon.Weapon.Damage = reader.GetString(value);
                }

                value = reader.GetOrdinal("saveMod");
                if (!reader.IsDBNull(value))
                {
                    gangerWeapon.Weapon.SaveMod = reader.GetString(value);
                }

                value = reader.GetOrdinal("ammoRoll");
                if (!reader.IsDBNull(value))
                {
                    gangerWeapon.Weapon.AmmoRoll = reader.GetString(value);
                }

                value = reader.GetOrdinal("type");
                gangerWeapon.Weapon.WeaponType = (WeaponType)reader.GetInt32(value);

                value = reader.GetOrdinal("cost");
                gangerWeapon.Weapon.Cost = reader.GetString(value);

                value = reader.GetOrdinal("availability");
                if (!reader.IsDBNull(value))
                {
                    gangerWeapon.Weapon.WeaponAvailability = (WeaponAvailability)reader.GetInt32(value);
                }

                value = reader.GetOrdinal("description");
                if (!reader.IsDBNull(value))
                {
                    gangerWeapon.Weapon.SpecialRules = reader.GetString(value);
                }

                value = reader.GetOrdinal("gangerWeaponId");
                gangerWeapon.GangerWeaponId = reader.GetString(value);

                value = reader.GetOrdinal("gangerId");
                gangerWeapon.GangerId = reader.GetString(value);
            }
            else
            {
                return null;
            }
            return gangerWeapon;
        }

        /// <summary>
        /// Gets a list of GangerWeapon from a SQL reader, but with only the weapon name returned.
        /// This is used with the GetGang call where the specific weapon information is unused.
        /// </summary>
        /// <param name="reader"></param>
        /// <returns></returns>
        private GangerWeapon GetGangerWeaponLimitedInformationFromReader(SqlDataReader reader)
        {
            var gangerWeapon = new GangerWeapon();
            if (reader.Read())
            {
                var value = reader.GetOrdinal("gangerId");
                gangerWeapon.GangerId = reader.GetString(value);

                value = reader.GetOrdinal("weaponName");
                gangerWeapon.Weapon.Name = reader.GetString(value);
            }
            else
            {
                return null;
            }

            return gangerWeapon;
        }
    }
}
