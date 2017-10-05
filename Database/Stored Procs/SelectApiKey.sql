CREATE PROCEDURE [dbo].[SelectApiKey]
AS
/*
	Execute dbo.SelectApiKey
*/
BEGIN
  SELECT [Id]
		  ,[Setting]
		  ,[Value]
  FROM [dbo].[ConfigSettings]
  Where Id = 1
END