# MACO Schedule Calendar Tool Notes

## Creating Schedule CSVs

The schedules that show up in the tool's drop-down live [here](https://github.com/jpratt-mru/maco.calendar.datafiles) on Github.

If you want to make a new schedule available in the drop-down, it's a 2-step process:

1. make a new CSV in the proper format, and
1. put the CSV into the Github repo

After the CSV is put into the repo, you can refresh the tool and the CSV will now show up in the drop-down.

### MAKING THE CSV

If you need to make a new CSV from a spreadsheet, you can just look at any of the CSVs currently on Github to guide you.

Perhaps that's a bit vague, so here are the steps I used to make a correctly-formatted CSV from a schedule of classes spreadsheet from June 2019 (it takes < 3 minutes to do this):

1. went to the MACO tab
1. removed merging from all cells
1. saved the result as a (comma delimited) CSV, saving only the active (MACO) sheet
1. closed and re-opened Excel so that I was only dealing with the single (MACO) worksheet now
1. deleted the first row of cells (since I wanted the first row to be a header row)
1. deleted all columns but ones that had:
   - course names (like COMP1501)
   - section numbers (like 401 or 1 - note this was **not** the "Sect" column!)
   - enrollment caps
   - day of the week
   - class start time
   - class duration
   - room number
   - instructor first name
   - instructor last name
1. ensured there was a course name in EVERY cell of the course name column:
   1. inserted a new empty column to the right of the current course name column
   1. in the first cell of this empty column that is next to the first course name in the existing course name column, put in a formula that copies the current course name if it exists, or uses the previous cells value if it doesn't (ex. `=IF(B2="",C1,B2)`)
   1. copied that formula down
   1. replaced the contents of the original course name column with the results (making sure to paste just the **values**, not the **formula**)
   1. deleted the inserted column made in step 1
1. replace the header row with the one used in the other valid CSVs

### COPYING THE CSV OVER TO GITHUB

If you have write access to the Github repo, you can just drag and drop the CSV over; otherwise, contact Jordan Pratt and get him to add you as a collaborator to the repo (or just give him the file and get him to do the copy).

## Developer Notes

### Framework

- React 16+
- [Parcel](https://parceljs.org/) for bundling, because learned about it in FrontEndMasters [Complete Intro to React v4](https://frontendmasters.com/courses/complete-react-v4/) and it's a ton simpler than Webpack.
- CSS stuffs through Google's [Material Design Light](https://getmdl.io), because I didn't want to spend a ton of time on design but still wanted things to look professional.

### Deployment

I'm hosting (at least for the time being) through Google's Firebase Hosting.

To deploy a new version of the app from the Digital Ocean dev machine (**maco.calendar.app.v1**):

1. remove current crud: `rm -rf .cache/ dist/`
1. `npm run build`
1. `firebase deploy`
