﻿-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[Weapons_GetByGangId]
	-- Add the parameters for the stored procedure here
	@GangId NVARCHAR(100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT
	w.weaponId,
	gw.gangId,
	weaponName,
	shortRange,
	longRange,
	hitShort,
	hitLong,
	strength,
	damage,
	saveMod,
	ammoRoll,
	type,
	cost,
	availability,
	description
	FROM Weapons w
	JOIN GangWeapons gw
	ON w.weaponId = gw.weaponId
	WHERE gw.gangId = @GangId;
END
