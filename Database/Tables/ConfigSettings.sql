CREATE TABLE [dbo].[ConfigSettings]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Setting] NVARCHAR(50) NOT NULL, 
    [Value] NVARCHAR(MAX) NOT NULL
)
